import DatePickerContainerDialog from 'components/dialog/DatePickerContainerDialog';
import DatePickerDialogBottom from 'components/datepicker/assets/Dialog/DatePickerDialogBottom';
import DatePickerDialogHeader from 'components/datepicker/assets/Dialog/DatePickerDialogHeader';
import SelectDay from 'components/datepicker/assets/SelectDay';
import SelectMonth from 'components/datepicker/assets/SelectMonth';
import SelectYear from 'components/datepicker/assets/SelectYear';

export interface DatePickerButtonDialogProps {
  DOBScreen: 'year' | 'month' | 'day';
  DOBShow: boolean;
  setDOBShow: VoidType;
  DOBDay: string;
  DOBMonth: string;
  DOBYear: string;
  GetDOBDay: Dispatch<string>;
  GetDOBMonth: Dispatch<string>;
  GetDOBYear: Dispatch<string>;
  DOBCancel: VoidType;
  DOBSubmit: VoidType;
  DOBSubmitDisabled: boolean;
}

function DatePickerButtonDialog(props: DatePickerButtonDialogProps) {
  const setHeaderDates = () => {
    return props.DOBYear + ', ' + props.DOBMonth + ' ' + props.DOBDay;
  };

  return (
    <DatePickerContainerDialog
      show={props.DOBShow}
      onClose={props.setDOBShow}
      disableClickAwayClose
    >
      <div className="flex h-[525px] w-[330px] flex-col">
        <DatePickerDialogHeader setHeaderDates={setHeaderDates()} />
        {props.DOBScreen === 'year' && (
          <SelectYear setYear={props.GetDOBYear} />
        )}
        {props.DOBScreen === 'month' && (
          <SelectMonth setMonth={props.GetDOBMonth} />
        )}
        {props.DOBScreen === 'day' && (
          <SelectDay
            day={props.DOBDay}
            month={props.DOBMonth}
            year={props.DOBYear}
            setDay={props.GetDOBDay}
            setMonth={props.GetDOBMonth}
            setYear={props.GetDOBYear}
          />
        )}
        <DatePickerDialogBottom
          cancel={props.DOBCancel}
          submit={props.DOBSubmit}
          submitActive={props.DOBSubmitDisabled}
        />
      </div>
    </DatePickerContainerDialog>
  );
}

export default DatePickerButtonDialog;
