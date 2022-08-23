import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ScheduleEvent } from '../../../../Types/ScheduleEvent';

interface IProps {
    isOpen: boolean
    onEventSubmit: (submit: boolean) => void;
    event: ScheduleEvent
}

const AlertDialog: React.FC<IProps> = ({isOpen, onEventSubmit, event}) => {
  const [open, setOpen] = React.useState(false);
  const [prevProps, setPrevProps] = React.useState(isOpen)

  React.useEffect(() => {
    if(prevProps !== isOpen){
        setOpen(isOpen)
    }
  })

  const handleClose = () => {
    setOpen(false);
  };

  const eventSubmit = (submit: boolean) => {
    onEventSubmit(submit)
    setOpen(false)
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => eventSubmit(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Запланировать событие?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Хотите запланировать событие на время {event?.title}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => eventSubmit(false)}>Отмена</Button>
          <Button onClick={() => eventSubmit(true)} autoFocus>
            Да
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default AlertDialog;