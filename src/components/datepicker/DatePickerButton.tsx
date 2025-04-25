'use client';

import { DatePickerButtonDialogProps } from './DatePickerButtonDialog';
import { useEffect, useState } from 'react';
import moment from 'moment';
import dynamic from 'next/dynamic';
import DatePickerCustomButton from './assets/DatePickerCustomButton';

const DatePickerButtonDialog = dynamic<DatePickerButtonDialogProps>(
  () => import('./DatePickerButtonDialog'),
  { ssr: false },
);

interface IProps {
  DOB: string;
  getDOB: Dispatch<string>;
  SubmitDisabled: boolean;
  setSubmitDisabled: Dispatch<boolean>;
}

function DatePickerButton(props: IProps) {
  const MomentDay = moment().endOf('day').format('DD');
  const MomentMonth = moment().endOf('month').format('MMM');
  const MomentYear = moment().endOf('year').format('YYYY');

  const _dataDay = props.DOB.split('-')[0];
  const _dataMonth = props.DOB.split('-')[1];
  const _dataYear = props.DOB.split('-')[2];

  // State
  const [DOBDialog, setDOBDialog] = useState(false);
  const [DOBScreen, setDOBScreen] = useState<'year' | 'month' | 'day'>('year');
  const [DOBSubmitDisabled, setDOBSubmitDisabled] = useState(false);
  const [DOBMoment, setDOBMoment] = useState({
    DOBDay: MomentDay,
    DOBMonth: MomentMonth,
    DOBYear: MomentYear,
  });

  // Handle Dialog
  const ShowDOBDialog = () => {
    setDOBDialog(true);
  };
  const HideDOBDialog = () => {
    setDOBDialog(false);
    setTimeout(() => {
      setDOBMoment({
        DOBDay: MomentDay,
        DOBMonth: MomentMonth,
        DOBYear: MomentYear,
      });
    }, 200);
  };

  // DOB Get
  const GetDOBDay = (day: string) => {
    setDOBMoment({ ...DOBMoment, DOBDay: day });
    setDOBSubmitDisabled(true);
  };
  const GetDOBMonth = (month: string) => {
    setDOBMoment({ ...DOBMoment, DOBMonth: month });
    setDOBScreen('day');
  };

  const GetDOBYear = (year: string) => {
    setDOBMoment({ ...DOBMoment, DOBYear: year });
    setDOBScreen('month');
  };

  // DOB handle
  const DOBOpenhandle = () => {
    setDOBScreen('year');
    setDOBSubmitDisabled(false);
    setDOBMoment({
      DOBDay: MomentDay,
      DOBMonth: MomentMonth,
      DOBYear: MomentYear,
    });
    ShowDOBDialog();
  };
  const DOBCancelhandle = () => {
    HideDOBDialog();
  };
  const DOBSubmithandle = () => {
    props.getDOB(
      DOBMoment.DOBDay + '-' + DOBMoment.DOBMonth + '-' + DOBMoment.DOBYear,
    );
    props.setSubmitDisabled(false);
    setDOBDialog(false);
  };
  const DOBLabel =
    DOBMoment.DOBDay + ' ' + DOBMoment.DOBMonth + ' , ' + DOBMoment.DOBYear;

  useEffect(() => {
    if (props.DOB) {
      setDOBMoment({
        DOBDay: _dataDay,
        DOBMonth: _dataMonth,
        DOBYear: _dataYear,
      });
    }
  }, [props.DOB]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <DatePickerCustomButton label={`${DOBLabel}`} onClick={DOBOpenhandle} />
      <DatePickerButtonDialog
        DOBShow={DOBDialog}
        setDOBShow={HideDOBDialog}
        DOBScreen={DOBScreen}
        DOBDay={DOBMoment.DOBDay}
        DOBMonth={DOBMoment.DOBMonth}
        DOBYear={DOBMoment.DOBYear}
        GetDOBDay={GetDOBDay}
        GetDOBMonth={GetDOBMonth}
        GetDOBYear={GetDOBYear}
        DOBCancel={DOBCancelhandle}
        DOBSubmit={DOBSubmithandle}
        DOBSubmitDisabled={DOBSubmitDisabled}
      />
    </>
  );
}

export default DatePickerButton;
