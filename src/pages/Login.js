import { AuthError, createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import logo from '../assets/Vector.png';
import { useState, useEffect } from "react";

const supabase = createClient(
  "https://tqmkfrtgqstcyeikkqds.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxbWtmcnRncXN0Y3llaWtrcWRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY5OTQ2OTQsImV4cCI6MjAyMjU3MDY5NH0.VyIks8CzVQH3yRsfDCaEVy5vExTvN9yxgiTjS91BuTY"
);

function Login() {  
  const navigate = useNavigate();
  const [userId, setUserId] = new useState(0);

  supabase.auth.onAuthStateChange(async (event) => {

    if (event === 'INITIAL_SESSION') {
        // navigate("/");
      } else if (event === 'SIGNED_IN') {
        setUserId(userId + 1);
        console.log("added");
        navigate("/success");
      } else if (event === 'SIGNED_OUT') {
        navigate("/");
      }
  });

  return (
    <div>
      <header>
        <img src={logo} style={{height: '3%', width: '3%', marginLeft: '48.5%', marginRight: 'auto', marginTop: '10rem', marginBottom: '1rem'}}></img>
        <Auth
          supabaseClient={supabase}
          localization={{
            variables: {
                sign_in: {
                  email_label: '',
                  password_label: '',
                  email_input_placeholder: 'email',
                  password_input_placeholder: 'password',
                  link_text: 'Go back to sign in',
                },
                sign_up: {
                    email_label: '',
                    password_label: '',
                    email_input_placeholder: 'email',
                    password_input_placeholder: 'password',
                  },
              },
          }}
          appearance={{ 
            style: {
                button: {background: '#2461FF', color: 'white', borderRadius: '0.75rem', height: '2rem', width: '27rem', justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto'},
                container: {marginLeft: 'auto', marginRight: 'auto'},
                input: {borderRadius: '0.5rem', width: '27rem', background: '#FFF', color: 'rgba(0, 0, 0, 0.50)', border: 'none', outline: 'none', padding: '0.375rem 0.75rem'},
            }
          }}
          providers={["google"]}
          redirectTo={`/success`}

        />
      </header>
    </div>
  );
}

export default Login;
