import { SupabaseClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from '@supabase/supabase-js';
import NewTeam from "./NewTeam";

const supabase = createClient(
    "https://tqmkfrtgqstcyeikkqds.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxbWtmcnRncXN0Y3llaWtrcWRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY5OTQ2OTQsImV4cCI6MjAyMjU3MDY5NH0.VyIks8CzVQH3yRsfDCaEVy5vExTvN9yxgiTjS91BuTY"
);

function Success() {

    const [user, setUser] = useState({});
    const [teamCode, setTeamCode] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function getUserData() {
            await supabase.auth.getUser().then((value) => {
                if(value.data?.user) {
                    setUser(value.data.user);
                }
            })
        }
        getUserData();
    }, []);
  
    function signOutUser() {
        const { error } = supabase.auth.signOut();
        console.log("signed out")
        navigate("/");
    }

    async function teamClick() {
        console.log(user);
        
        let { data: teams, error } = await supabase
          .from('teams')
          .select('*')
          .eq('team_code', teamCode)
          
          if(teams.length == 0) {
            alert("Invalid Team Code");
          }
          else{        
            const { error } = await supabase
              .from('user_info')
              .update({team_name: teams[0].team_name, team_code: teams[0].team_code, team_id: teams[0].team_id})
              .eq('email', user.email)
              
            let uniqueEmail = user.email;
            let preVal = JSON.stringify(uniqueEmail);
            console.log(preVal);
            let updatedVal = {...teams.team_members, preVal}
            
            const { error2 } = await supabase
              .from('teams')
              .update({team_members: updatedVal})
              .eq('team_code', teamCode)

            console.log(teams);
            alert("You joined team: " + teams[0].team_name);
          }

        //check if team code exists in DB
        //if so add user to db with team code
        //add with corresponding team id
    }

    return (
      <div className="App">
        <header className="App-header">
          <div style={{marginLeft: '30%', marginRight: 'auto', marginTop: '10%', marginBottom: '20%'}}>
              <form>
                <label>Join a Team by entering the code: </label>
                <input style={{marginRight: '0.5rem'}} placeholder="Enter a team code" type="text" onChange={(e) => setTeamCode(e.target.value)}></input>
                <button type="button" onClick={teamClick}>Submit</button>
              </form>
              <h3>OR</h3> 
              <form>
                <label>Create a new team here: </label>
                <button type="submit" onClick={() => navigate("/newTeam")}>Create New Team</button>
              </form>
          </div>
          <button style={{marginLeft: '30%', height: '2rem', width: '10rem', backgroundColor: '#2461FF', color: 'white', cursor: 'pointer'}} onClick={() => signOutUser()}>Sign Out</button>
        </header>
      </div>
    );
  }
  
  export default Success;