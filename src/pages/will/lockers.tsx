import Form from "~/component/form"

const Lockers=()=>{
    const props = [
        "BankName",
        "Branch",
        "AccNo",
        "rent",
        "Nominee"
      ];
    return(
        <Form props={props} title="Locker Details"/>
    )
}
export default Lockers;