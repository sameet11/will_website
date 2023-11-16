import Form from "~/component/form"

const ppf=()=>{
    const props=["BankName","AccNo","MaturityDate","Nominee"]
    return(
        <Form props={props} title="Ppf Details"/>
    )
}

export default ppf;