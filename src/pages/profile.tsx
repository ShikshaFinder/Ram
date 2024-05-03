import React, { useEffect, useState } from "react";
// import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

import {
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Button,
  Box,
  useTab,
  useMultiStyleConfig,
} from "@chakra-ui/react";
// import Leaderbord from "../components/Leaderbord";
import { useAuthContext } from "@/context";
import { useUser } from "../../store";
import Nouser from "@/components/Nouser";
import Profilee from "../components/profile";
import Temp from "../components/temp";
import { useRouter } from "next/router";

function Profile() {
  const { user } = useAuthContext();
  const useUse = useUser((state) => state.user);
  const router = useRouter();
  const CustomTab = React.forwardRef<HTMLElement, any>((props, ref) => {
    const tabProps = useTab({ ...props, ref });
    const isSelected = !!tabProps["aria-selected"];

    // 2. Hook into the Tabs `size`, `variant`, props
    const styles = useMultiStyleConfig("Tabs", tabProps);

    return (
      <Button __css={styles.tab} {...tabProps}>
        <Box as="span" mr="2">
          {isSelected ? "😎" : "😐"}
        </Box>
        {tabProps.children}
      </Button>
    );
  });

  if (!user.email) {
    return <Nouser />;
  }
  return (
    <>
      {" "}
      <Tabs>
        <TabList>
          <CustomTab>Profile</CustomTab>
          <CustomTab>Courses</CustomTab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {" "}
            <Profilee
              name={useUse?.name || "Shiksha Finder"}
              email={useUse?.email || "ceo@shikshafinder.com"}
              board={useUse?.Board || "CBSE"}
              medium={useUse?.medium || "English"}
              standard={useUse?.Standard || "10th"}
              city={useUse?.city || "Delhi"}
              state={useUse?.State || "Delhi"}
              coins={useUse?.Coins || 30}
            />
          </TabPanel>
          <TabPanel>
            <Temp />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <a
        href="schoolleaderbord"
        style={{ textDecoration: "underline", color: "blue" }}
      >
        school leaderbord
      </a>
    </>
  );
}

export default Profile;

export async function getServerSideProps(context: any) {
  let content = "shiksha finder"; // Fetch the data here

  return {
    props: {
      content, // will be passed to the page component as props
    },
  };
}
