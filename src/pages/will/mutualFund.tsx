import Form from "~/component/form"

const mutualFund=()=>{
    const props=["FolioNo","Applicant","Amount","MfName","Nominee"]
    return(
        <Form props={props} title="Mutual Funds Details"/>
    )
}

export default mutualFund