import React from 'react';
import Form from '~/component/form';

const BankAccountForm = () => {
  const props=["BankName","Branch","Type","Nominee"]
  return <Form props={props} title='Bank Information'/>
};

export default BankAccountForm;