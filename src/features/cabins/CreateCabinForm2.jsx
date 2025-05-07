import {toast} from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";
import { addCabin } from "../../services/apiCabins";
import PropTypes from "prop-types";

const Label = styled.label`
  font-weight: 500;
`;

// const Error = styled.span`
//   font-size: 1.4rem;
//   color: var(--color-red-700);
// `;

function CreateCabinForm({cabinEdit = {} }) {
  const {id: editId, ...editValues} = cabinEdit;

  const isEditSession = Boolean(editId);

  const {register, handleSubmit, reset, getValues, formState} = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const {errors} = formState;
  console.log(errors);

  const queryClient = useQueryClient();

  const {mutate, isLoading: isCreating} = useMutation({
    mutationFn: addCabin,
    onSuccess : ()=> {
      toast.success("Cabin successfully created")
      queryClient.invalidateQueries({queryKey : ['Cabins']});
      reset();
    },
    onError : (err)=>{
      toast.error(err.message);
    },
  });

  function onSubmit(data){
   mutate({...data, image: data.image[0]});
  }

  function onError(error){
    console.log(error);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input 
          type="text" 
          id="name" 
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
        <FileInput 
          id="image"
          accept="image/*"
          disabled={isCreating}
          type="file"
          {...register(
            "image", 
            {
              required: "This field is required",
            }
          )} 
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled = {isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

CreateCabinForm.propTypes = {
  cabinEdit: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    capacity: PropTypes.number,
    price: PropTypes.number,
    discount: PropTypes.number,
    description: PropTypes.string,
    image: PropTypes.string,
  }),
};
export default CreateCabinForm;


import { useForm } from "react-hook-form";
import {toast} from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { addCabin } from "../../services/apiCabins";

const Label = styled.label`
  font-weight: 500;
`;

// const Error = styled.span`
//   font-size: 1.4rem;
//   color: var(--color-red-700);
// `;

function CreateCabinForm() {
  const {register, handleSubmit, reset, getValues, formState} = useForm();

  const {errors} = formState;
  console.log(errors);

  const queryClient = useQueryClient();

  const {mutate, isLoading: isCreating} = useMutation({
    mutationFn: addCabin,
    onSuccess : ()=> {
      toast.success("Cabin successfully created")
      queryClient.invalidateQueries({queryKey : ['Cabins']});
      reset();
    },
    onError : (err)=>{
      toast.error(err.message);
    },
  });

  function onSubmit(data){
   mutate({...data, image: data.image[0]});
  }

  function onError(error){
    console.log(error);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input 
          type="text" 
          id="name" 
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
        <FileInput 
          id="image"
          accept="image/*"
          disabled={isCreating}
          type="file"
          {...register(
            "image", 
            {
              required: "This field is required",
            }
          )} 
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled = {isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
