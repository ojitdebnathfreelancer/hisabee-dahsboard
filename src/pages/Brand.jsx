import React, { useEffect, useState } from "react";
import { usePagination, useTable } from "react-table";
import { MdDelete } from "react-icons/md";
import DefaultLayout from "../layout/DefaultLayout";
import TableSetting from "../components/TableSetting/TableSetting";
import MainTable from "../components/MainTable/MainTable";
import Pagination from "../components/Pagination/Pagination";
import ModalDialog from "../layout/ModalDialog";
import { BiEdit } from "react-icons/bi";
import UpdateModal from "../components/UpdateModal";
import DeleteModal from "../components/DeleteModal";
import CreateCategoryModal from "../components/CreateCategoryModal";

const Brand = () => {
  const [data, setData] = useState([]);
  const [quiery, setQuiery] = useState("");

  const [editId, setEditId] = useState("");
  const [editData, setEditiData] = useState({});
  const [updatedData, setUpdatedData] = useState({});

  const [deleteId, setDeleteId] = useState("");
  const [refresh, setRefresh] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [showMeModal, setShowMeModal] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  // modal function ends

  useEffect(() => {
    fetch(
      `https://jsonplaceholder.typicode.com/comments?q=${quiery}&_limit=${100}`
    )
      .then((res) => res.json())
      .then((d) => setData(d));
  }, [quiery, refresh]);
  // table data get from DB

  useEffect(() => {
    if (deleteId && isDelete) {
      const existData = data.filter((d) => d.id !== deleteId);
      setData(existData);
      if (existData) {
        setIsDelete(false);
        setDeleteId("");
      }
    }
  }, [isDelete, deleteId, refresh]);
  // delete single data

  const columns = React.useMemo(
    () => [
      {
        Header: `BRAND Name`,
        accessor: "name",
        Cell: (row) => {
          return (
            <div className="flex items-center">
              <img
                className="h-[50px] w-[50px] rounded-[50%]"
                src="https://thumbs.dreamstime.com/z/laptop-computer-blank-white-screen-mobile-table-cafe-background-139812612.jpg"
                alt="img"
              />
              <span className="ml-5">{row.cell?.row?.original?.name}</span>
            </div>
          );
        },
      },
      {
        Header: "Product count",
        accessor: "id",
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: (row) => (
          <div className="flex items-center justify-center space-x-1.5">
            <button
              onClick={() => {
                setShowMeModal("edit");
                openModal();
                setEditId(row.cell?.row?.original?.id);
                setEditiData(row.cell?.row?.original);
              }}
            >
              <BiEdit className="text-primary" size={25} />
            </button>
            <button
              onClick={() => {
                setShowMeModal("delete");
                openModal();
                setDeleteId(row.cell?.row?.original?.id);
              }}
              className="rounded-[50%]"
            >
              <MdDelete className="text-meta-1" size={25} />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const mainUseTable = useTable({ columns, data }, usePagination);

  return (
    <>
      <DefaultLayout>
        <div className="pt-5">
          <TableSetting
            setQuiery={setQuiery}
            openModal={openModal}
            setShowMeModal={setShowMeModal}
          />

          {data.length === 0 ? (
            <div
              id="preloader"
              className="flex min-h-[50vh] items-center justify-center bg-white"
            >
              <p className="text-center font-semibold capitalize">
                No Data Available
              </p>
            </div>
          ) : (
            <MainTable mainUseTable={mainUseTable} />
          )}

          <Pagination mainUseTable={mainUseTable} data={data} />
        </div>
      </DefaultLayout>

      {isOpen && showMeModal === "create" && (
        <ModalDialog
          isOpen={isOpen}
          closeModal={closeModal}
          title="Create Brand"
          width="500"
        >
          <CreateCategoryModal closeModal={closeModal} />
        </ModalDialog>
      )}

      {isOpen && editData && showMeModal === "edit" && (
        <ModalDialog
          isOpen={isOpen}
          closeModal={closeModal}
          title="Edit Brand"
          width="500"
        >
          {showMeModal === "edit" && (
            <UpdateModal
              closeModal={closeModal}
              data={editData}
              setUpdatedData={setUpdatedData}
            />
          )}
        </ModalDialog>
      )}
      {/* brand edit modal  */}

      {isOpen && showMeModal === "delete" && (
        <ModalDialog
          isOpen={isOpen}
          closeModal={closeModal}
          title=""
          width="500"
        >
          {showMeModal === "delete" && (
            <DeleteModal
              variant={"Brand"}
              closeModal={closeModal}
              setIsDelete={setIsDelete}
            />
          )}
        </ModalDialog>
      )}
      {/* brand delete modal  */}
    </>
  );
};

export default Brand;
