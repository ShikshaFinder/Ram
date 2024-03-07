import React from "react";
import StudentCard from "@/components/studentCard";
import supabase from "../../supabase";
import { useAuthContext } from "@/context";
import { useEffect, useState } from "react";

function studentlist() {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState<any[] | null>(null);

  async function getSchool() {
    try {
      let { data, error } = await supabase.from("admissionform").select("*");

      if (error) throw error;
      setUserData(data);
      console.log(data, error);
    } catch (error) {
      console.log("Caught Error:", error);
    }
  }

  useEffect(() => {
    getSchool();
  }, [user]);

  return (
    <>
      {userData && userData.map((admissionform: { name: string }, index) => (
        <StudentCard text={admissionform.name} />
      ))}
    </>
  );
}

export default studentlist;
