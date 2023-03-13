export default function SongOnProfile({ ...props }) {
    return (
      <div className="flex flex-col w-32 align-middle rounded-lg gap-1 min-w-min h-fit shrink-0 text-center">
        <img
          className="h-32 w-32 "
          src="https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          alt="logo"
        ></img>
        <div className="">Song Name</div>
        <div className="">Artist Name</div>
      </div>
    );
  }