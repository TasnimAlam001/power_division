// import React from 'react';
// import {
//     Box,
//     Button,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogContentText,
//     DialogTitle,
//     FormControl,
//     InputLabel,
//     MenuItem,
//     Paper,
//     Select,
//     TextField,
//     Typography,
//     useMediaQuery,
//   } from "@mui/material";
// import { useForm } from "react-hook-form";
// import useAxiosSecure from '@/app/Hooks/useAxiousSecure';


// const AddUser = ({handleClickOpen}) => {
//   const [open, setOpen] = React.useState(false);
//   const [type, setType] = React.useState("customer");
//   const [axiosSecure] = useAxiosSecure();


//     const {
//         register,
//         handleSubmit,
//         setValue,
//         watch,
//         formState: { errors },
//         reset,
//       } = useForm();
    
//       const onSubmit = async (data) => {
//         console.log(data)
//         try {
//           reset();
//           const { name, email, phone, password, type, company_id } = data;
    
//           await axiosSecure.post("/users", { name, email, phone, password, type, company_id })
//             .then((response) => {
//               if (response) {
//                 setOpen(false);
//                 toast.success("User Added successfully!");
    
//               }
//             })
//             .catch((error) => {
//               console.log("Error submitting form:", error);
//               toast.error("Error submitting form. Please try again.");
//             });
//         } catch (error) {
//           console.error("Unexpected error:", error);
//         }
//       };
//     const handleClickOpen = () => {
//         setOpen(true);
//       };
    
//       const handleClose = () => {
//         setOpen(false);
//       };
//       React.useEffect(() => {
//         setValue("created_at", new Date().toISOString());
//       }, [setValue]);
    
//     return (
//         <Dialog
//         fullWidth
//         maxWidth="md"
//         // fullScreen={fullScreen}
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="responsive-dialog-title"
//         // sx={{width:1000}}
//       >
//         {/* <DialogTitle> */}
//         <DialogTitle id="responsive-dialog-title">
//           {"ADD USER"}
//         </DialogTitle>
//         <DialogContent sx={{ px: { md: 10 } }}>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <Box sx={{ pb: 2, mt: 2 }}>
//               <TextField
//                 label="Name"
//                 fullWidth
//                 variant="outlined"
//                 {...register("name", { required: "Name is required" })}
//                 error={!!errors.name}
//                 helperText={errors.name ? errors.name.message : ""}
//               />
//             </Box>
//             <Box sx={{ pb: 2 }}>
//               <TextField
//                 label="Email"
//                 fullWidth
//                 variant="outlined"
//                 {...register("email", { required: "Email is required" })}
//                 error={!!errors.email}
//                 helperText={errors.email ? errors.email.message : ""}
//               />
//             </Box>
//             <Box sx={{ pb: 2, mt: 2 }}>
//               <TextField
//                 label="Phone"
//                 fullWidth
//                 variant="outlined"
//                 {...register("phone", {
//                   required: "Phone number is required",
//                 })}
//                 error={!!errors.phone}
//                 helperText={errors.phone ? errors.phone.message : ""}
//               />
//             </Box>
//             <Box sx={{ pb: 2, mt: 2 }}>
//               <TextField
//                 label="Password"
//                 fullWidth
//                 variant="outlined"
//                 {...register("password", {
//                   required: "Password is required",
//                   minLength: 6,
//                 })}
//                 error={!!errors.password}
//                 helperText={errors.password ? errors.password.message : ""}
                
//               />
//               {errors.password?.type === 'minLength' && <Typography sx={{color: red[600]}} role="alert">Password must be at least 6 characters</Typography>}
//             </Box>
//             <Box sx={{ pb: 2 }}>
//               <FormControl
//                 fullWidth
//                 variant="outlined"
//                 error={!!errors.type}
//               >
//                 <InputLabel>Type</InputLabel>
//                 <Select
//                   {...register("type", { required: "Type is required" })}
//                   label="Type"
//                   onChange={(e) => setType(e.target.value)}
//                 >
//                   <MenuItem value="admin">Admin</MenuItem>
//                   <MenuItem value="company">Company</MenuItem>
//                   <MenuItem value="customer">Customer</MenuItem>
//                 </Select>
//               </FormControl>
//               {errors.type && (
//                 <Box sx={{ color: "red", marginTop: 1 }}>
//                   {errors.type.message}
//                 </Box>
//               )}
//             </Box>
//             {type === "company" && (
//               <Box sx={{ pb: 2 }}>
//                 <FormControl
//                   fullWidth
//                   variant="outlined"
//                   error={!!errors.company}
//                 >
//                   <InputLabel>Company</InputLabel>
//                   <Select
//                     {...register("company_id", {
//                       required: "Company is required",
//                     })}
//                     label="Company"
//                   >
//                     <MenuItem value="1">BPDB</MenuItem>
//                     <MenuItem value="2">BREB</MenuItem>
//                     <MenuItem value="3">DESCO</MenuItem>
//                     <MenuItem value="4">DPDC</MenuItem>
//                     <MenuItem value="5">WZPDCL</MenuItem>
//                     <MenuItem value="6">NESCO</MenuItem>
//                   </Select>
//                 </FormControl>
//                 {errors.company_id && (
//                   <Box sx={{ color: "red", marginTop: 1 }}>
//                     {errors.company_id.message}
//                   </Box>
//                 )}
//               </Box>
//             )}
//             <DialogActions>
//               <Button onClick={handleClose} color="secondary">
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="success"
//                 // onClick={handleClose}
//               >
//                 Add User
//               </Button>
//             </DialogActions>
//           </form>
//         </DialogContent>
//       </Dialog>
//     );
// };

// export default AddUser;