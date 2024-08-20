import Card from '@renderer/components/general/Card';

const Settings = () => {
  return (
    <div className="flex justify-center flex-col items-center space-y-1">
      <Card className="md:w-[800px] lg:w-[1500px] text-center">
        <form className="flex flex-col space-y-6">
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-5">
              <label className="text-xl font-medium text-gray-90">Auto Updates</label>
              <select id="auto-updates" name="auto-updates" defaultValue="disabled">
                <option value="disabled">Disabled</option>
                <option value="enabled">Enabled</option>
              </select>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Settings;
