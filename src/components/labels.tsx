import { useState, ChangeEvent, MouseEvent, useEffect } from "react";
import "./labels.css";
import Label from "./label";
import axios, { AxiosError } from "axios";

interface Label {
  name: string;
  id: number;
}

interface Props {
  onSignOut: any;
  tk: any;
  name: any;
}

function Labels({ onSignOut, tk, name }: Props) {
  const [labels, setLabels] = useState<Label[]>([]);
  const [toAdd, setToAdd] = useState("");
  const [username, setUsername] = useState(null);
  // const [temp, setTemp] = useState([1, 2, 3]);

  useEffect(() => {
    setUsername(name);
    // console.log(username);
    axios
      .post<Label[]>("http://52.14.248.3:8000/mylabels/", name)
      .then((res) => {
        let mylabels = res.data;

        setLabels(mylabels);
        console.log(labels);
      })
      .catch((err) => console.log(err));
  }, []);

  const inchange = async (ev: ChangeEvent) => {
    // console.log(ev.target.value);
    setToAdd((ev.target as HTMLInputElement).value); // ###########################
    // console.log(toAdd);
  };

  const addLabel = async (ev: MouseEvent) => {
    console.log(toAdd);
    console.log(username);

    let res = await axios.post("http://52.14.248.3:8000/labels/", {
      name: toAdd,
      user: username,
    });
    console.log(res.data);
    axios
      .post<Label[]>("http://52.14.248.3:8000/mylabels/", name)
      .then((res) => {
        let mylabels = res.data;

        setLabels(mylabels);
        console.log(labels);
      })
      .catch((err) => console.log(err));
  };

  const deleteLabel = async (id: any) => {
    console.log(id);
    let res = await axios.post("http://52.14.248.3:8000/dellabels/", id);
    console.log(res.data);
    axios
      .post<Label[]>("http://52.14.248.3:8000/mylabels/", name)
      .then((res) => {
        let mylabels = res.data;
        setLabels(mylabels);
        console.log(labels);
      })
      .catch((err) => console.log(err));
  };

  const showLabel = () => {
    // let arr = [];
    // Object.values(labels).forEach((lb) => arr.push(lb));
    // arr.map
  };

  return (
    <div className="labelbox">
      <h1 className="login">My labels</h1>
      <input
        onChange={(ev) => inchange(ev)}
        type="text"
        placeholder="add a new label"
      />
      <button onClick={addLabel}> Add</button>
      {/* <button onClick={showLabel}> show label</button> */}

      <div>
        {labels.map((label) => (
          <Label key={label.id} lb={label} onDelete={deleteLabel}></Label>
        ))}

        <button onClick={onSignOut}> Sign Out</button>
      </div>
    </div>
  );
}

export default Labels;
