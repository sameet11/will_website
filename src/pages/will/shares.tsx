import Form from "~/component/form"

const shares=()=>{
    const props=["DematAccount","Company","Quantity","Nominee"]
    return(
        <Form props={props} title="Company Shares"/>
    )
}

export default shares;