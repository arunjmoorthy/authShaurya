import { AuthError, createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import logo from '../assets/Vector.png';
import { useState, useEffect } from "react";
import { SupabaseClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://tqmkfrtgqstcyeikkqds.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxbWtmcnRncXN0Y3llaWtrcWRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY5OTQ2OTQsImV4cCI6MjAyMjU3MDY5NH0.VyIks8CzVQH3yRsfDCaEVy5vExTvN9yxgiTjS91BuTY"
);

function findTeamCode() {
    while(true) {
      let result = '';
      const length = 6;
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      let counter = 0;
      for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
      }
      console.log(result);
      if(checkUniqueCode(result)){
        return result;
      }
    }
    return "";
}

async function checkUniqueCode(code) {
  const { data: teams, error } = await supabase
      .from('teams')
      .select('*')
      .eq('team_code', code);

  if (error) {
      console.error("Error fetching teams:", error.message);
      return false;
  }

  return teams.length > 0;
}


function NewTeam() {

  const [user, setUser] = useState({});

  useEffect(() => {
      async function getUserData() {
          await supabase.auth.getUser().then((value) => {
            console.log(value);
              if(value.data?.user) {
                  setUser(value.data.user.email);
              }
          })
      }
      getUserData();
  }, []);

  const navigate = useNavigate();
  const [teamCode, setTeamCode] = new useState("");
  const [teamName, setTeamName] = new useState("");

  async function onDashClick() {
    //update table with team name, team owner, and teamCode
    
    const { data, error } = await supabase
    .from('teams')
    .insert([
      { team_owners: user, team_name: teamName, team_code: teamCode},
    ])
    .select()
        
    navigate("/dashboard");
  }

    useEffect(() => {
      async function fetchData() {
          const code = findTeamCode();
          setTeamCode(code);
      }

      fetchData();
      }, []); 

  return (
    <div style={{ padding: "5rem" }}>
      <header>
        <form>
            <label>Team Name: </label>
            <input type="text" placeholder="Enter team name" onChange={(e) => setTeamName(e.target.value)}></input>
        </form>
        <h4>Team Code: {teamCode}</h4>
        <button type="submit" onClick={onDashClick}>Continue to Dashboard</button>
      </header>
    </div>
  );
}

export default NewTeam;
