#include "esp_camera.h"
#include <WiFi.h>
#include <ArduinoWebsockets.h>
#include <ArduinoJson.h>
#include "strings.h"
#include "esp_timer.h"
#include "img_converters.h"
#include "fb_gfx.h"
#include "soc/soc.h"
#include "soc/rtc_cntl_reg.h"
#include "driver/gpio.h"
#include "config.h"

// configuration for AI Thinker Camera board
#define PWDN_GPIO_NUM 32
#define RESET_GPIO_NUM -1
#define XCLK_GPIO_NUM 0
#define SIOD_GPIO_NUM 26
#define SIOC_GPIO_NUM 27
#define Y9_GPIO_NUM 35
#define Y8_GPIO_NUM 34
#define Y7_GPIO_NUM 39
#define Y6_GPIO_NUM 36
#define Y5_GPIO_NUM 21
#define Y4_GPIO_NUM 19
#define Y3_GPIO_NUM 18
#define Y2_GPIO_NUM 5
#define VSYNC_GPIO_NUM 25
#define HREF_GPIO_NUM 23
#define PCLK_GPIO_NUM 22

camera_fb_t *fb = NULL;
size_t _jpg_buf_len = 0;
uint8_t *_jpg_buf = NULL;
bool led_on = false;

using namespace websockets;
WebsocketsClient client;

esp_err_t init_camera()
{
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sscb_sda = SIOD_GPIO_NUM;
  config.pin_sscb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;

  // parameters for image quality and size
  config.frame_size = FRAMESIZE_CIF; // FRAMESIZE_ + QVGA|CIF|VGA|SVGA|XGA|SXGA|UXGA
  config.jpeg_quality = 35;          // 10-63 lower number means higher quality
  config.fb_count = 1;

  Serial.print("Connecting Camera: ");
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK)
  {
    Serial.printf("Failed 0x%x", err);
    return err;
  }
  sensor_t *s = esp_camera_sensor_get();
  s->set_framesize(s, config.frame_size);

  Serial.println("OK");

  return ESP_OK;
};

esp_err_t setup_wifi()
{
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting Wifi: ");

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.print(". ");
  }

  Serial.println("OK");

  return ESP_OK;
}

void onMessageCallback(WebsocketsMessage message)
{
  JsonDocument doc;
  DeserializationError error = deserializeJson(doc, message.data());

  if (error)
  {
    Serial.println(error.f_str());
    return;
  }

  const char *led = doc["led"];
  if (strcmp(led, "on") == 0)
  {
    led_on = true;
    digitalWrite(CAMERA_LED_PIN, HIGH);
  }
  else
  {

    led_on = false;
    digitalWrite(CAMERA_LED_PIN, LOW);
  }
}

esp_err_t setup_websocket()
{
  Serial.print("Connecting WebSocket: ");
  client.onMessage(onMessageCallback);

  if (USE_SSL)
  {
    client.setCACert(SSL_CERT);
  }

  bool connected = client.connect(WEBSOCKET_URL);
  if (!connected)
  {
    Serial.println("Failed");
    return ESP_FAIL;
  }

  Serial.println("OK");

  return ESP_OK;
};

void setup()
{
  pinMode(CAMERA_LED_PIN, OUTPUT);
  WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0);

  Serial.begin(115200);
  Serial.setDebugOutput(true);

  init_camera();
  setup_wifi();
  setup_websocket();
}

void loop()
{
  if (client.available())
  {
    camera_fb_t *fb = esp_camera_fb_get();
    if (!fb)
    {
      Serial.println("Image capture failed");
      esp_camera_fb_return(fb);
      ESP.restart();
    }

    client.sendBinary((const char *)fb->buf, fb->len);
    esp_camera_fb_return(fb);

    client.poll();
  }
}
