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
    onEventSubmit: (submit: boolean, isAdding: boolean) => void;
    event: ScheduleEvent
    isAdding: boolean
    recruiterName: string
}

const AlertDialog: React.FC<IProps> = ({isOpen, onEventSubmit, event, isAdding, recruiterName}) => {
  const [open, setOpen] = React.useState(false);
  const [prevProps, setPrevProps] = React.useState(isOpen)

  React.useEffect(() => {
    if(prevProps !== isOpen){
        setOpen(isOpen)
    }
  })

  const eventSubmit = (submit: boolean) => {
    onEventSubmit(submit, isAdding)
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
        {isAdding
          ? <>
              <DialogTitle id="alert-dialog-title">
            {"Установить рабочее время?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Хотите установить рабочее время для <strong>{recruiterName}</strong> на период <strong>{event?.title.split(' ').join('\u00A0')}</strong>?
            </DialogContentText>
          </DialogContent>
          </>
          : <>
            <DialogTitle id="alert-dialog-title">
          {"Удалить рабочее время?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Хотите удалить рабочее время для <strong>{recruiterName}</strong> на период <strong>{event?.title.split(' ').join('\u00A0')}</strong>?
          </DialogContentText>
        </DialogContent>
          </>
        }
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