import SendOutlined from '@mui/icons-material/SendOutlined';

const Newsletter = () => {
  return (
    <div className="h-[60vh] bg-gray-200 flex items-center justify-center flex-col border-b-2 border-gray-400">
      <h1 className="text-[70px] mb-5 text-gray-800">Newsletter</h1>
      <div className="text-[24px] font-light mb-5 text-gray-800 text-center">
        Get timely updates from your favorite products.
      </div>
      <div className="w-1/2 h-10 bg-white flex justify-between border border-gray-300 sm:w-4/5">
        <input 
          type="text" 
          placeholder="Your email" 
          className="border-none flex-[8] pl-5 outline-none" 
        />
        <button className="flex-[1] border-none bg-blue-500 text-white">
          <SendOutlined />
        </button>
      </div>
    </div>
  );
};

export default Newsletter;
