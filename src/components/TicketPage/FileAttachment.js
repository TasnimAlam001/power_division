import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { FormControl, Grid, Typography } from "@mui/material";


const FileAttachment = ({ onFileChange }) => {
  const [attachments, setAttachments] = useState([{ id: 1, name: "file1" }]);

  const handleAddAttachment = () => {
    const newAttachment = {
      id: attachments.length + 1,
      name: `file${attachments.length + 1}`,
    };
    setAttachments([...attachments, newAttachment]);
  };

  const handleDeleteAttachment = (id) => {
    const updatedAttachments = attachments.filter(
      (attachment) => attachment.id !== id
    );
    setAttachments(updatedAttachments);

    onFileChange(updatedAttachments.map((attachment) => attachment.file));
  };

  const handleFileChange = (event, id) => {
    const file = event.target.files[0]; 
    const updatedAttachments = attachments.map((attachment) =>
      attachment.id === id ? { ...attachment, file } : attachment
    );
    setAttachments(updatedAttachments);
  
    onFileChange(updatedAttachments.map((attachment) => attachment.file));
  };
  

  return (
    <div>
      {attachments.map((attachment, index) => (
        <Grid container key={attachment.id} style={{ marginBottom: "10px" }}>
          <Grid item xs={11}>
            <Typography variant="subtitle1">
              অভিযোগ সংক্রান্ত নথি সংযুক্ত করুন - {attachment.id} (যদি থাকে)
            </Typography>
          </Grid>

          <Grid item xs={1} style={{ textAlign: "right" }}>
            {index == 0 ? (
              <Button
                variant="outlined"
                size="small"
                onClick={handleAddAttachment}
                // startIcon={<AddIcon />}
                color="success"
                style={{ marginBottom: "2px" }}
              >
                Add More
              </Button>
            ) : (
              <IconButton
                onClick={() => handleDeleteAttachment(attachment.id)}
                style={{ marginLeft: "auto" }}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                size="small"
                type="file"
                id={attachment.name}
                name={attachment.name}
                onChange={(event) => handleFileChange(event, attachment.id)}
                variant="outlined"
              />
            </FormControl>
          </Grid>
        </Grid>
      ))}
    </div>
  );
};

export default FileAttachment;
