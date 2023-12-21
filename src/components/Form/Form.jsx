import Select from 'react-select';
const Page = ({ data }) => {
  const options = [
    ...data.map((segment) => ({
      value: segment.SegmentName,
      label: segment.SegmentName,
    })),
  ];
  return (
    <>
      <form className="w-full p-2">
        <div className="flex flex-wrap">
          <div className="w-4/12  flex-0 sm:w-3/12">
            <label
              className="ml-0 font-bold text-xs text-slate-700 dark:text-white/80"
              htmlFor="segment"
            >
              Segment
            </label>
            <Select
              placeholder="Select Segment"
              name="segment"
              options={options}
            />
          </div>
          <div className="w-4/12 max-w-full px-3 flex-0 sm:w-3/12">
            <button
              className="py-2.5 px-5 mt-6 mr-1 button inline-block  font-bold text-center bg-gradient-to-tl from-green-500 to-green-500 uppercase align-middle transition-all rounded-lg cursor-pointer leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs text-white"
              type="button"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Page;
