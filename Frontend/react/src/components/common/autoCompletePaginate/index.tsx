/* eslint-disable react-hooks/exhaustive-deps */

import * as Styled from "./styles";
import { useEffect, useRef, useState } from "react";
import { PaginationType } from "app";
import { Input } from "../input";

type ResultType = {
  results: any[];
  pagination: PaginationType;
};

type Props = {
  loadFunction: (
    page?: number,
    size?: number,
    search?: string,
    order?: string,
    sort?: string
  ) => Promise<ResultType>;
  loadId: any;
  id: string;
  name: string;
  label: string;
  sortField: string;
  order?: string;
  reset: boolean;
  value: number; //id
  onClick: (item: any) => void;
  marginRight: string;
  error?: string;
};

export const AutoCompletePaginate = ({
  id,
  name,
  value,
  loadFunction,
  label,
  sortField,
  order,
  reset,
  onClick,
  loadId,
  marginRight,
  error,
}: Props) => {
  const listInnerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [search, setSearch] = useState("");
  const [valueText, setValue] = useState(null);
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(0);
  const [orderValue, setOrder] = useState(order);
  const [fieldValue, setField] = useState(sortField);
  const [results, setResults] = useState([]);
  const [pagination, setPagination] = useState<PaginationType | undefined>(
    undefined
  );

  const [visibleOption, setVisibleOption] = useState(false);

  // The scroll listener
  const handleScroll = async () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;

      if (
        Math.round(scrollTop + clientHeight) === scrollHeight &&
        scrollHeight != 0
      ) {
        //final

        loadPage(page, size, search, orderValue, fieldValue);
      }
    }
  };

  const resetText = () => {
    if (reset) {
      setValue(null);
      setSearch("");
    }
  };

  useEffect(() => {
    resetText();
  }, [reset]);

  useEffect(() => {
    handleScroll();
  }, [results]);

  useEffect(() => {
    const item: any = results.find((item: any) => item.id == value);
    if (item) {
      setValue(item.name);
    } else {
      if (value == 0) return;
      if (value == -1) return;
      if (value == undefined) return;

      loadId(value)
        .then((res: any) => {
          setValue(res.name);
        })
        .catch();
    }
  }, [value]);

  useEffect(() => {
    loadPage(page, size, search, orderValue, fieldValue);
  }, []);

  const loadPage = async (
    page: number | undefined,
    size: number | undefined,
    search: string | undefined,
    orderValue: string | undefined,
    fieldValue: string | undefined
  ) => {
    if (pagination != null && pagination?.lastPage <= page!) {
      return;
    }
    if (page != null) {
      await loadFunction(page, size, search, orderValue, fieldValue).then(
        (res: any) => {
          if (page == 0) {
            setResults(res.results);
          } else {
            setResults(results.concat(res.results));
          }
          setPage(page + 1);
          setPagination(res.pagination);
          if (search) {
            setVisibleOption(true);
          }
        }
      );
    }
  };

  const onClickItem = async (item: any) => {
    onClick(item);
    setValue(item.name);
    setSearch("");
    if (search != "") {
      await loadFunction(0, size, "", orderValue, fieldValue).then(
        (res: any) => {
          setPage(1);
          setResults(res.results);
          setPagination(res.pagination);
        }
      );
    }
    setVisibleOption(false);

    if (listInnerRef.current) {
      listInnerRef!.current.scrollTop = 0;
    }
  };

  return (
    <Styled.Wrapper style={{ marginRight: marginRight }}>
      <label>{label}</label>
      <Styled.Row>
        <input
          id={id}
          ref={inputRef}
          name={name}
          value={valueText ? valueText : search}
          placeholder={"Buscar"}
          style={
            error
              ? {
                  width: "220px",
                  height: "40px",
                  border: "2px solid #ff0000",
                  borderRadius: "5px",
                }
              : {
                  width: "220px",
                  height: "40px",
                  border: "2px solid #ccc",
                  borderRadius: "5px",
                }
          }
          onChange={async (e) => {
            setSearch(e.target.value);
            setPage(0);
            setResults([]);
            setPagination(undefined);
            loadPage(0, size, e.target.value, orderValue, fieldValue);
          }}
          onKeyDown={async ({ key }) => {
            if (key == "Backspace") {
              if (listInnerRef.current) {
                listInnerRef.current.scrollTop = 0;
              }

              setValue(null);
              onClick(null);
              setSearch("");
              await loadFunction(0, size, "", orderValue, fieldValue).then(
                (res: any) => {
                  setPage(1);
                  setResults(res.results);
                  setPagination(res.pagination);
                  if (search) {
                    setVisibleOption(true);
                  }
                }
              );
            }
          }}
        ></input>

        <button
          type="button"
          style={
            error
              ? { border: "2px solid #ff0000" }
              : { border: "2px solid #ccc" }
          }
          onClick={() => {
            if (listInnerRef.current) {
              listInnerRef.current.scrollTop = 0;
            }

            setVisibleOption(!visibleOption);
            if (visibleOption == false) {
              if (inputRef.current) {
                inputRef.current.focus();
              }
            }
          }}
        >
          <i className="material-icons" onClick={() => {}}>
            arrow_drop_down
          </i>
        </button>
      </Styled.Row>
      <small>{error}</small>

      <div
        style={{
          position: "absolute",
          display: visibleOption ? "block" : "none",
          width: "280px",
          zIndex: 1001,
        }}
        onScroll={(e) => handleScroll()}
      >
        <Styled.Card
          ref={listInnerRef}
          style={{
            padding: 0,
            margin: 0,
            height: "auto",
            maxHeight: "200px",
            overflow: "auto",
          }}
          onScroll={handleScroll}
        >
          {results.map((item: any, index) => {
            return (
              <Styled.Item key={id + index} onClick={() => onClickItem(item)}>
                {item.name}
              </Styled.Item>
            );
          })}
        </Styled.Card>
      </div>
    </Styled.Wrapper>
  );
};
