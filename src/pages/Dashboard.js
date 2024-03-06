import { AuthError, createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import logo from '../assets/Vector.png';
import { useState, useEffect } from "react";
import { SupabaseClient } from "@supabase/supabase-js";
import LineChart from "../components/LineChart";

function Dashboard() {

  const data = Array.from({ length: 365 }, (_, i) => i + 1);

  return (
    <div>
      <header>
        <h1>Dashboard</h1>
        <LineChart initialData={data} title="Task Completion"/>
        <LineChart initialData={data} title="Treatment Adherence"/>
        <LineChart initialData={data} title="Enrolled Patience"/>
      </header>
    </div>
  );
}

export default Dashboard;
