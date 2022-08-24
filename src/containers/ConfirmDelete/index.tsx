import DialogComponent from '../../components/Dialog';

function ConfirmDelete(props: any) {
  const { open, handleSubmit, handleClose, taskId } = props;

  return (
    <>
      <DialogComponent
        open={open}
        title={'Delete'}
        handleSubmit={() => handleSubmit(taskId)}
        handleClose={() => handleClose()}
      >
        <p>Are you sure you want to delete {taskId} ?</p>
      </DialogComponent>
    </>
  );
}

export default ConfirmDelete;