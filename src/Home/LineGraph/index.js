import React from "react";
import {
  LineGraph,
  Flex,
  FlexItem,
  Title,
  Card,
  Nav,
  Background,
  Button,
  Icon,
  Table,
  TableRow,
  Caption,
  IconValue,
  IconCircle,
  CircleIconButton,
  Body,
} from "playbook-ui";
import Search from "./Search";
const data = [
  {
    name: "Number of Installations",
    data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
  },
];

const LineGraphLegendNonclickable = (props) => (
  <Flex orientation="column" vertical="center">
    <Flex orientation="column" marginTop="lg" marginBottom="sm" align="start">
      <FlexItem>
        <Caption text="Google Trends" className="light" />
      </FlexItem>
      <FlexItem>
        <Title size={3} tag="h3" text="Explore" />
      </FlexItem>
    </Flex>

    <Search />

    <FlexItem>
      <LineGraph
        axisTitle="Number of Employees"
        chartData={data}
        id="line-test-3"
        legend
        title="Interest over time"
        toggleLegendClick={false}
        xAxisCategories={[
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
        ]}
        {...props}
      />
    </FlexItem>
  </Flex>
);

export default LineGraphLegendNonclickable;
