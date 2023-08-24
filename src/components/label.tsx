import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { GiSave } from "react-icons/gi";
import axios, { AxiosError } from "axios";
import "./label.css";

interface Props {
  lb: any;
  onDelete: any;
}

function Label({ lb, onDelete }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const [displayName, setDisplayName] = useState(lb.name);
  const [newLabelName, setNewLabelName] = useState(lb.name);

  const handleDel = () => {
    console.log(lb);
    onDelete(lb.id);
  };
  const handleEdit = async () => {
    console.log(lb);
    // onEdit(lb.id);
    if (isEdit) {
      //   console.log(lb.id);

      try {
        let res = await axios.post("http://52.14.248.3:8000/editlabels/", {
          id: lb.id,
          name: newLabelName,
        });
        console.log(res.data);
        setDisplayName(res.data);
        // setNewLabelName(res.data);
      } catch {
        (err: any) => console.log(err);
      }
    }
    setIsEdit(!isEdit);
  };
  // const handleChange = (ev) => {
  //   // console.log(ev.target.value);
  // };

  return (
    <div className="label">
      {!isEdit && <p>{displayName}</p>}
      {isEdit && (
        <input
          onChange={(ev) => setNewLabelName(ev.target.value)}
          type="text"
          defaultValue={displayName}
        />
      )}
      <div className="box2">
        {!isEdit && (
          <div className="editbtn" onClick={handleEdit}>
            <FiEdit />
          </div>
        )}
        {isEdit && (
          <div className="editbtn" onClick={handleEdit}>
            <GiSave />
          </div>
        )}

        <div className="editbtn" onClick={handleDel}>
          <RiDeleteBin2Line />
        </div>
      </div>
    </div>
  );
}

export default Label;
