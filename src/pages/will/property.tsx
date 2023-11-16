import Form from "~/component/form"

const property=()=>{
    const props=["Address","Areain(sqft)","Pincode","city","State","Country"];
    return(
        <Form props={props} title="Property Details"/>
    )
}

export default property;