import { Badge, useMantineTheme } from "@mantine/core";
import { type CameraStatus } from "@watchtower-api/types";

export default function CameraStatusBadge({
  status,
}: {
  status: CameraStatus;
}) {
  const theme = useMantineTheme();

  const statusColors: Record<CameraStatus, string> = {
    inactive: theme.colors.dark[7],
    maintenance: theme.colors.yellow[7],
    active: theme.colors.green[7],
  };

  return (
    <Badge p={12} color={statusColors[status]} style={{ float: "right" }}>
      {status}
    </Badge>
  );
}
