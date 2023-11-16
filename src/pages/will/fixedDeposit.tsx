import React from 'react';
import Form from '~/component/form';

const FixedDepositForm = () => {
  const props=["Company","Amount","MaturityDate","Nominee"]
  return (
    <Form props={props} title='Fixed Deposit Details'/>
  );
};

export default FixedDepositForm;