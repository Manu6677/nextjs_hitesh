export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Test Id</h1>
      <hr />
      <h1 className="text-3xl">
        User Profile page of Test id{" "}
        <span className="bg-purple-500 text-yellow-50 px-3 rounded-lg py-4">
          {params.testid}
        </span>
      </h1>
    </div>
  );
}
