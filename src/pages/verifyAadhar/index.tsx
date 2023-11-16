import Verification from "~/component/verification";
const verifyAadhar = () => {
    return(
        <div>
            <Verification  Element="VERIFY AADHAR"placeholder="Enter Your Aadhar Number" buttonEle="Send Otp" check={true}/>
        </div>
  );
};

export default verifyAadhar;
