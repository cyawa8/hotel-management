import {toast} from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { editCabin } from "../../services/apiCabins";
import { useForm } from "react-hook-form";

import PropTypes from "prop-types";

const Label = styled.label`
  font-weight: 500;
`;

// const Error = styled.span`
//   font-size: 1.4rem;
//   color: var(--color-red-700);
// `;

function CreateCabinForm({cabinEdit = {}, onCloseModal }) {
  console.log("Editing Cabin Data:", cabinEdit);
  const {id: editId, ...editValues} = cabinEdit;

  const isEditSession = Boolean(editId);

  const {register, handleSubmit, reset, getValues, formState} = useForm({
    defaultValues: isEditSession ? {...editValues, image: editValues.image || ""} : {},
  });

  const {errors} = formState;
  console.log(errors);

  const queryClient = useQueryClient();

  const {mutate: createCabin, isLoading: isCreating} = useMutation({
    mutationFn: editCabin,
    onSuccess : ()=> {
      toast.success("Cabin successfully created")

      queryClient.invalidateQueries({queryKey : ['cabins']});
      reset();
      onCloseModal?.();
    },
    onError : (err)=>{
      toast.error(err.message);
    },
  });

  const {mutate: editCabinMutation, isLoading: isEditing} = useMutation({
    mutationFn: ({newCabinData, id}) => editCabin(newCabinData, id),

    onMutate: async({ newCabinData, id }) => {
      await queryClient.cancelQueries({ queryKey: ["cabins"]});
      const previousCabins = queryClient.getQueryData(["cabins"]);

      queryClient.setQueryData(["cabins"], (old) =>
        old?.map((cabin)=>(cabin.id===id ? {...cabin, ...newCabinData} : cabin))
    );

    return {previousCabins};
    },
    
    onSuccess : ()=> {
      toast.success("Cabin successfully editded!");
      queryClient.invalidateQueries({queryKey : ['Cabins']});
      reset();
      onCloseModal?.();
    },
    onError : (err)=>{
      toast.error(err.message);
    },
  });

  const isWorking = isCreating || isEditing;

  function onSubmit(data){
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if(isEditSession) {editCabinMutation({newCabinData: {...data, image}, id:editId});}
    else createCabin({...data, image: image});
  }

  function onError(error){
    console.log(error);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input 
          type="text" 
          id="name" 
          disabled={isWorking}
          {...register(
            "name", 
            {
              required: "This field is required",
            }
          )} 
        />
      </FormRow>

      <FormRow label="Max Capacity" error={errors?.capacity?.message}>
        <Input 
          type="number" 
          id="capacity" 
          disabled={isWorking}
          {...register(
            "capacity", 
            {
              required: "This field is required", 
              min:{
                value : 1, 
                message: "Number must be greater than 1"
              }
            }
          )} 
        />
      </FormRow>

      <FormRow label="Price" error={errors?.price?.message}>
        <Input 
          type="number" 
          id="price" 
          disabled={isWorking}
          {...register(
            "price", 
            {
              required: "This field is required", 
              min:
              {
                value : 1, 
                message: "Number must be greater than 1"
              }
            }
          )} 
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input 
          type="number" 
          id="discount" 
          defaultValue={0} 
          disabled={isWorking}
          {...register(
            "discount", 
            {
              required: "This field is required", 
              min: 
              {
                value : 0, 
                message: "This field is required",
              },
                validate: (discount) => 
                discount <= getValues().price || "Discount should be less than regular price", 
            }
          )} 
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea 
          type="text" 
          id="description" 
          defaultValue="" 
          disabled={isWorking}
          {...register(
            "description", 
            {
              required: "This field is required",
            }
          )} 
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        {isEditSession && editValues.image && (
          <img src={editValues.image} alt="Cabin preview" style={{ width: "100px", marginBottom: "10px" }} />
        )}
        <FileInput 
          id="image"
          accept="image/*"
          disabled={isWorking}
          type="file"
          {...register(
            "image", 
            {
              required: isEditSession ? false : "This field is required",
            }
          )} 
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick = {()=>onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled = {isCreating}>{ isEditSession ? "Edit Cabin" : "Create New Cabin" }</Button>
      </FormRow>
    </Form>
  );  
}
Form.defaultProps = {
  type: "regular",
}


CreateCabinForm.propTypes = {
  cabinEdit: PropTypes.shape({
    id: PropTypes.PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    name: PropTypes.string,
    capacity: PropTypes.number,
    price: PropTypes.number,
    discount: PropTypes.number,
    description: PropTypes.string,
    image: PropTypes.string,
  }),
  onCloseModal: PropTypes.func,
};
export default CreateCabinForm;

