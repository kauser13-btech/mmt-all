export default function ProductDescription({ data }) {
  return (
    <div className="text-base font-roboto font-normal flex flex-col gap-4 text-left">
      <DescriptionHead data={data} />
    </div>
  );
};

const DescriptionHead = ({ data }) => {
  return (
    <>
      <div className="text-base flex flex-col gap-4">
        <div>
          <span className="font-bold">Regular Fit -</span> The standard length
          keeps you comfortable and relaxed, while the fabric effortlessly
          adapts to your movements.
        </div>
        <div>
          <span className="font-bold">Classic Wear -</span> Our customers love
          this classic option for everyday wear.
        </div>
        <div>
          <span className="font-bold">Edge-Seamed -</span> The edges of two
          parts are sewn together to create a fitted appearance Pre-shrunk
          fabric. 100% combed ring spun cotton.
        </div>
        <div>
          <span className="font-bold">Eco-Friendly -</span> MatchMyTees is
          committed to sustainability by saving energy, limiting its water
          usage, and recycling leftover fabric.
        </div>
        <div>
          <span className="font-bold">Matching T-Shirt Only -</span> We sold
          t-shirts only sneakers and other products sold separately.
        </div>
        <div>
          <span className="font-bold">Care instruction -</span> Machine wash
          with a cold for like colors. Only use bleach without chlorine when
          necessary. Low tumble dry. If necessary, cool the iron.
        </div>
        {data.type} - {data.title} - Sneaker-Matching{" "}
        {data.type} ({data.design.title}) is a high quality
        sneaker-matching {data.type} designed to match your{" "}
        {data.title} sneakers. -This {data.type} is designed with
        the exact colors to match with a premium look and feel. We only use the
        best materials and inks to produce our merchandise. All sizes are true
        to size.
      </div>
      <div className="font-bold -mt-1">
        **Note: Sneakers are for matching purposes only, NOT included in the
        sale.
      </div>
      <div className="md:border md:border-[#B1B5B8] rounded-md">
        <div className="flex items-center max-md:gap-5 max-md:justify-between md:px-4 border-b-[.5px] border-[#B1B5B8] max-md:border-t-[.5px]">
          <div className="text-base py-3 font-bold min-w-[118px] max-w-[118px] md:min-w-[166px] md:max-w-[166px]">
            Matches with
          </div>
          <div className="text-base py-3 font-normal flex-grow md:pl-5 capitalize md:border-l md:border-[#B1B5B8]">
            {data.title}
          </div>
        </div>
        <div className="flex items-center max-md:gap-5 max-md:justify-between md:px-4 border-b-[.5px] border-[#B1B5B8] max-md:border-t-0">
          <div className="text-base py-3 font-bold min-w-[118px] max-w-[118px] md:min-w-[166px] md:max-w-[166px]">
            Fabric Type
          </div>
          <div className="text-base py-3 font-normal flex-grow md:pl-5 capitalize md:border-l md:border-[#B1B5B8]">
            {data.material}
          </div>
        </div>
        <div className="flex items-center max-md:gap-5 max-md:justify-between md:px-4 border-b-[.5px] border-[#B1B5B8] max-md:border-t-0">
          <div className="text-base py-3 font-bold min-w-[118px] max-w-[118px] md:min-w-[166px] md:max-w-[166px]">
            Item Weight
          </div>
          <div className="text-base py-3 font-normal flex-grow md:pl-5 md:border-l md:border-[#B1B5B8]">
            About 4 oz
          </div>
        </div>
        <div className="flex items-center max-md:gap-5 justify-between md:px-4 border-b-[.5px] border-[#B1B5B8]">
          <div className="text-base py-3 font-bold min-w-[118px] max-w-[118px] md:min-w-[166px] md:max-w-[166px] min-h-full">
            Department
          </div>
          <div className="text-base py-3 font-normal flex-grow md:pl-5 md:border-l md:border-[#B1B5B8]">
            Adult Large
          </div>
        </div>
        <div className="flex items-center max-md:gap-5 justify-between md:px-4 border-b-[.5px] border-[#B1B5B8]">
          <div className="text-base py-3 font-bold min-w-[118px] max-w-[118px] md:min-w-[166px] md:max-w-[166px] min-h-full">
            Manufacture
          </div>
          <div className="text-base py-3 font-normal flex-grow md:pl-5 md:border-l md:border-[#B1B5B8]">
            Bella+Canvas
          </div>
        </div>
        <div className="flex items-center max-md:gap-5 justify-between md:px-4 border-b-[.5px] border-[#B1B5B8]">
          <div className="text-base py-3 font-bold min-w-[118px] max-w-[118px] md:min-w-[166px] md:max-w-[166px] min-h-full">
            Item Type
          </div>
          <div className="text-base py-3 font-normal flex-grow md:pl-5 md:border-l md:border-[#B1B5B8]">
            {data.type}
          </div>
        </div>
        <div className="flex items-center max-md:gap-5 justify-between md:px-4 border-b-[.5px] border-[#B1B5B8]">
          <div className="text-base py-3 font-bold min-w-[118px] max-w-[118px] md:min-w-[166px] md:max-w-[166px] min-h-full">
            Domestic Shipping
          </div>
          <div className="text-base py-3 font-normal flex-grow md:pl-5 md:border-l md:border-[#B1B5B8]">
            Item can be shipped within U.S
          </div>
        </div>
        <div className="flex items-center max-md:gap-5 justify-between md:px-4 border-b-[.5px] border-[#B1B5B8]">
          <div className="text-base py-3 font-bold min-w-[118px] max-w-[118px] md:min-w-[166px] md:max-w-[166px] min-h-full">
            International Shipping
          </div>
          <div className="text-base py-3 font-normal flex-grow md:pl-5 md:border-l md:border-[#B1B5B8]">
            Sneakers and other products sold separately.
          </div>
        </div>
        <div className="flex items-center max-md:gap-5 justify-between md:px-4 border-b-[.5px] border-[#B1B5B8]">
          <div className="text-base py-3 font-bold min-w-[118px] max-w-[118px] md:min-w-[166px] md:max-w-[166px] min-h-full">
            Country Of Origin
          </div>
          <div className="text-base py-3 font-normal flex-grow md:pl-5 md:border-l md:border-[#B1B5B8]">
            USA
          </div>
        </div>
        <div className="flex items-center max-md:gap-5 justify-between md:px-4 border-b-[.5px] border-[#B1B5B8]">
          <div className="text-base py-3 font-bold min-w-[118px] max-w-[118px] md:min-w-[166px] md:max-w-[166px] min-h-full">
            Ratings & Review
          </div>
          <div className="text-base py-3 font-normal flex-grow md:pl-5 md:border-l md:border-[#B1B5B8]">
            4.8 out of 5 stars 14,533 ratings.
          </div>
        </div>
        <div className="flex items-center max-md:gap-5 justify-between md:px-4 border-b-[.5px] border-[#B1B5B8]">
          <div className="text-base py-3 font-bold min-w-[118px] max-w-[118px] md:min-w-[166px] md:max-w-[166px] min-h-full">
            Closure Type
          </div>
          <div className="text-base py-3 font-normal flex-grow md:pl-5 md:border-l md:border-[#B1B5B8]">
            Pull-on
          </div>
        </div>
        <div className="flex items-center max-md:gap-5 justify-between md:px-4 border-b-[.5px] border-[#B1B5B8]">
          <div className="text-base py-3 font-bold min-w-[118px] max-w-[118px] md:min-w-[166px] md:max-w-[166px] min-h-full">
            Printing Methods
          </div>
          <div className="text-base py-3 font-normal flex-grow md:pl-5 md:border-l md:border-[#B1B5B8]">
            Printed
          </div>
        </div>
        <div className="flex items-center max-md:gap-5 justify-between md:px-4 border-b-[.5px] border-[#B1B5B8]">
          <div className="text-base py-3 font-bold min-w-[118px] max-w-[118px] md:min-w-[166px] md:max-w-[166px] min-h-full">
            Design Name
          </div>
          <div className="text-base py-3 font-normal flex-grow md:pl-5 capitalize md:border-l md:border-[#B1B5B8]">
            {data.design.title}
          </div>
        </div>
        <div className="flex items-center max-md:gap-5 justify-between md:px-4 border-b-[.5px] border-[#B1B5B8]">
          <div className="text-base py-3 font-bold min-w-[118px] max-w-[118px] md:min-w-[166px] md:max-w-[166px] min-h-full">
            Design Artist
          </div>
          <div className="text-base py-3 font-normal flex-grow md:pl-5 md:border-l md:border-[#B1B5B8]">
            MatchMyTees
          </div>
        </div>
        <div className="flex items-center max-md:gap-5 justify-between md:px-4 border-[#B1B5B8]">
          <div className="text-base py-3 font-bold min-w-[118px] max-w-[118px] md:min-w-[166px] md:max-w-[166px] min-h-full">
            Care Instruction
          </div>
          <div className="text-base py-3 font-normal flex-grow md:pl-5 md:border-l md:border-[#B1B5B8]">
            Machine wash
          </div>
        </div>
      </div>
    </>
  )
}