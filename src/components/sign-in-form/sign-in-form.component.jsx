import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { signInUserWithEmailAndPassword, signInWithGooglePopup, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
import "./sign-in-form.styles.scss";

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);

    const {email,password} = formFields;
    const handleSignIn = async(event) => {
        event.preventDefault();

        try {
            await signInUserWithEmailAndPassword(email, password);

            clearFormFields();
        } catch (error) {
            alert('Wrong credentials !');
            console.log(error);
        }
    }
    const clearFormFields = () => {
        setFormFields(defaultFormFields);
    }
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    }

    const signInWithGoogle = async() => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }
    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with you Email and password</span>
            <form onSubmit={handleSignIn}>
                <FormInput label='Email' type='email' onChange={handleChange} name='email' value={email} required />
                <FormInput label='Password' type='password' onChange={handleChange} name='password' value={password} required />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType='google' onClick={signInWithGoogle}>Google sign in</Button>
                </div>
                
            </form>
        </div>
    )
}

export default SignInForm;