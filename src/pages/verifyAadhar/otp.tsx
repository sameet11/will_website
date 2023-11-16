
import Verification from "~/component/verification";

const Otp = () => {
    return (
        <div>
            <Verification
                placeholder="Enter OTP"
                Element="Enter OTP"
                buttonEle="Verify OTP"
                check={false}
            />
        </div>
    );
};

export default Otp;