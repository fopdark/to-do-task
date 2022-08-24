import { Typography } from "@mui/material";

interface HeaderComponentModel {
  title: string;
}
function HeaderComponent(props: HeaderComponentModel) {
  const { title } = props;
  return (
    <Typography variant="h3" align="center" data-testid="title">
      {title}
    </Typography>
  );
}

export default HeaderComponent;
