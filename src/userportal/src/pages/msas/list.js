import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/Api';
import { Button } from 'react-bootstrap';
import ConfirmModal from '../../components/ConfirmModal'; 
import PagedTable from '../../components/PagedTable';

const Msas = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sowToDelete, setSowToDelete] = useState(null);
  const [reload, setReload] = useState(false);

  const handleDelete = async () => {
    if (!sowToDelete) return;

    try {
      await api.msas.delete(sowToDelete);
      setSuccess('MSA deleted successfully!');
      setError(null);
      setShowDeleteModal(false);
      setReload(true); // Refresh the data
    } catch (err) {
      setSuccess(null);
      setError(err.message);
    }
  }

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Start Date',
        accessor: 'start_date',
      },
      {
        Header: 'End Date',
        accessor: 'end_date',
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }) => (
          <div>
            <a href={`/msas/${row.original.id}`} className="btn btn-link" aria-label="Edit">
              <i className="fas fa-edit"></i>
            </a>
            <Button variant="danger" onClick={() => { setSowToDelete(row.original.id); setShowDeleteModal(true); }} aria-label="Delete">
              <i className="fas fa-trash-alt"></i>
            </Button>
          </div>
        ),
      }
    ],
    []
  );

  const fetchData = async (skip, limit, sortBy, search) => {
    const response = await api.msas.list(skip, limit, sortBy, search);
    return response;
  };

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">MSAs</h1>
        <Link to="/msas/create" className="btn btn-primary">New <i className="fas fa-plus" /></Link>
      </div>
      <PagedTable columns={columns} fetchData={fetchData} reload={reload} />

      <ConfirmModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleConfirm={handleDelete}
        message="Are you sure you want to delete this MSA?"
      />
    </div>
  );
};

export default Msas;