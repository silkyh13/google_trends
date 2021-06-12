import React from "react";
import {
  Background,
  Flex,
  FlexItem,
  SectionSeparator,
  User,
  LabelValue,
  Image,
} from "playbook-ui";

const Nav = ({ width }) => {
  return (
    <div className="nav-bar-header-desktop">
      <Background
        backgroundColor="white"
        paddingLeft="lg"
        paddingRight="lg"
        paddingTop="xs"
      >
        <Flex vertical="center">
          <Image
            size="xs"
            url="https://logos-world.net/wp-content/uploads/2020/04/BTS-Logo.png"
          />

          <FlexItem grow />

          <LabelValue
            className="badge"
            active
            paddingRight="sm"
            icon="bell"
            title="4"
            variant="details"
          />
          <LabelValue
            className="badge"
            active
            paddingRight="sm"
            icon="envelope"
            title="2"
            variant="details"
          />

          <div>
            <User
              paddingRight="xs"
              align="left"
              avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
              name="Maria Illescas"
              // orientation="horizontal"
            />
          </div>

          <i className="fas fa-chevron-down"></i>
        </Flex>
      </Background>

      <SectionSeparator />
    </div>
  );
};

export default Nav;
