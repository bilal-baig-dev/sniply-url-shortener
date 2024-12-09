import { MoveRight } from "lucide-react";
import Flex from "./common/Flex";
import Block from "./common/Block";
import ListItem from "./common/ListItem";
import Section from "./common/Section";
import SectionTitleDescription from "./common/SectionTitleDescription";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

type ItemProps = {
  title: string;
  description: string;
  icon: any;
  items: { name: string }[];
  timeSaved: string;
};

type FeatureGridProps = {
  features: ItemProps[];
  title: string;
  description: string;
};
function FeaturesGrid({ features, title, description }: FeatureGridProps) {
  return (
    <Block id="features">
      <Section className="flex-col">
        <SectionTitleDescription title={title} description={description} />
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-x-5 gap-y-7">
          {features.map((el, index) => {
            const { icon: Icon } = el;
            return (
              <Card key={index} className="flex flex-col  gap-4 px-5 py-7 dark:border-card transition-colors duration-250 rounded-2xl shadow-2xl">
                <Flex className="flex-col gap-4">
                  <div className="flex gap-2 items-start">
                    <Icon className="h-6 w-6 text-primary" />
                    <h3 className="text-base  font-semibold">{el.title}</h3>
                  </div>
                  <span className="text-left text-md">{el.description}</span>
                </Flex>
                <Flex className="flex-col gap-6">
                  <ul className="list-none gap-3 flex flex-col">
                    {el.items.map((item, i) => {
                      return <ListItem key={i} text={item.name} />;
                    })}
                  </ul>
                  <div className="flex justify-start items-center">
                    <Button className="flex items-center gap-2">
                      Learn more
                      <MoveRight className="w-4 h-4" />
                    </Button>
                  </div>
                </Flex>
              </Card>
            );
          })}
        </div>
      </Section>
    </Block>
  );
}

export default FeaturesGrid;
