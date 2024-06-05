import React from 'react'
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";


let renderCount = 0;
export default function Formarray() {
    const { register, control, handleSubmit, reset, watch,formState:{errors} } = useForm({
        defaultValues: {
          test: [{ firstName: "Bill", lastName: "Luo" }]
        }
      });
      const {
        fields,
        append,
        prepend,
        remove,
        swap,
        move,
        insert,
        replace
      } = useFieldArray({
        control,
        name: "test"
      });
    
      //console.info(errors);
    
      const onSubmit = (data) => console.log("data:======>", data);
    
      // if you want to control your fields with watch
      // const watchResult = watch("test");
      // console.log(watchResult);
    
      // The following is useWatch example
      // console.log(useWatch({ name: "test", control }));
    
      renderCount++;
  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Field Array </h1>
      <p>The following demo allow you to delete, append, prepend items</p>
      <span className="counter">Render Count: {renderCount}</span>
      <ul>
        {fields.map((item, index) => {
          return (
            <li key={item.id}>
              <input {...register(`test[${index}].firstName`,{ required: "this field is required" })}
                className={
                  errors.test?.[index]?.firstName ? "form-control is-invalid" : "form-control"
                } />
              <p className="text-danger">{errors.test?.[index]?.firstName.message}</p>
              {/* <Controller
                render={({ field }) => <input {...field} />}
                name={`test.${index}.lastName`}
                control={control}
              /> */}
              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
      <section>
        <button
          type="button"
          onClick={() => {
            append({ firstName: "", lastName: "" });
          }}
        >
          add
        </button>
      

      

       

       

     
      </section>

      <input type="submit" />
    </form>
    </div>
  )
}

