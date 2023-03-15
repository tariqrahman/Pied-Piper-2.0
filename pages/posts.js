
export default function posts(){
    var some_test_data = {"id":123,"test":"test"};
 
    return (
        <div>
        <button onClick ={() => clickHandler(some_test_data)}>
            test POST request
        </button>
        <button >
            test GET request
        </button>
            
        </div>
    );
}



async function clickHandler(enteredData) {
    //console.log(enteredData);
    //console.log(JSON.stringify(enteredData));
    const response = await 
    fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(enteredData),
      //body: enteredData,
      headers: 
      {
        "Content-Type": 
        "application/json",
      },
    });
    const data = await response;
    //console.log("after data");
    //console.log(data);
   }


