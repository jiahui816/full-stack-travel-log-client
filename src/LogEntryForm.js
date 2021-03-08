import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createLogEntry } from './API';
function LogEntryForm({ location }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      const created = await createLogEntry(data);
      console.log(created);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='entry-form'>
      {error ? <h3>{error}</h3> : null}
      <label htmlFor='title'>Title</label>
      <input name='title' required ref={register} />
      <label htmlFor='comments'>Comments</label>
      <textarea name='comments' row={3} ref={register}></textarea>
      <label htmlFor='description'>Description</label>
      <textarea name='description' row={3} ref={register}></textarea>
      <label htmlFor='image'>Image</label>
      <input name='image' ref={register} />
      <label htmlFor='visitDate'>Visit Date</label>
      <input name='visitDate' type='date' required ref={register} />
      <button disabled={loading}>
        {loading ? 'Loading...' : 'Create Entry'}
      </button>
    </form>
  );
}

export default LogEntryForm;
