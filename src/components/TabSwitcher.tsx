import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Digital } from "./Digital";
import { Analog } from "./Analog";
import { WstClockType } from "../hooks/useWstClock";

const TabSwitcher = (wstClock: { wstClock: WstClockType }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Tabs defaultValue="tab1" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="tab1"
            className="text-l font-bold py-1 text-gray-700 data-[state=inactive]:text-gray-300 data-[state=active]:border-b-2 data-[state=active]:border-blue-400"
          >
            デジタル
          </TabsTrigger>
          <TabsTrigger
            value="tab2"
            className="text-l font-bold py-1 text-gray-700 data-[state=inactive]:text-gray-300 data-[state=active]:border-b-2 data-[state=active]:border-blue-400"
          >
            アナログ
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" className="mt-6">
          <div className="space-y-4">
            <Digital time={wstClock.wstClock.wstTime} />
          </div>
        </TabsContent>
        <TabsContent value="tab2" className="mt-6">
          <Analog time={wstClock.wstClock.wstTime} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabSwitcher;
