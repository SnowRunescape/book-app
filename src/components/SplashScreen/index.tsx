const SplashScreen = (props: any) => {
  const { message } = props;

  return (
    <div className="flex flex-col justify-between items-center w-screen h-screen bg-gray-50 p-12">
      <div>{message ?? "SnowDev"}</div>

      <div className="text-center">
        <span className="text-gray-500">from</span>

        <img src="/assets/img/logo.png" alt="SnowDev" width={160} />
      </div>
    </div>
  );
};

export default SplashScreen;
