import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface DialogComponentModel {
  open: boolean;
  handleSubmit: () => void;
  handleClose: () => void;
  title: string;
  children?: React.ReactNode;
}

function DialogComponent(props: DialogComponentModel) {
  const { open, handleSubmit, handleClose, title, children } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle data-testid="dialog-title" id="scroll-dialog-title">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogComponent;
