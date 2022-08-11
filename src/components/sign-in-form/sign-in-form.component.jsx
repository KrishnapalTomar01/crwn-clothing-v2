import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { signInUserWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import { ButtonsContainer, SignInContainer } from "./sign-in-form.styles";

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
        await signInWithGooglePopup();
    }
    return (
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your Email and password</span>
            <form onSubmit={handleSignIn}>
                <FormInput label='Email' type='email' onChange={handleChange} name='email' value={email} required />
                <FormInput label='Password' type='password' onChange={handleChange} name='password' value={password} required />
                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google sign in</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm;