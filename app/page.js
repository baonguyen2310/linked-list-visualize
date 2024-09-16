'use client'
import React, { useState } from 'react';
import LinkedList from '@/components/LinkedList';

export default function Home() {
  const [listData, setListData] = useState([]);
  const [newNodeValue, setNewNodeValue] = useState('');
  const [removeIndex, setRemoveIndex] = useState('');
  const [getIndex, setGetIndex] = useState('');
  const [getValue, setGetValue] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isGetting, setIsGetting] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [prevIndex, setPrevIndex] = useState(-1);
  const [printedList, setPrintedList] = useState([]);
  const [nodeToRemove, setNodeToRemove] = useState(null);

  const addNode = () => {
    if (newNodeValue.trim() !== '') {
      setIsAdding(true);
      setCurrentIndex(-1);
      const addNodeWithAnimation = async () => {
        if (listData.length > 0) {
          for (let i = 0; i < listData.length; i++) {
            setCurrentIndex(i);
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
        await new Promise(resolve => setTimeout(resolve, 500)); // Wait for new node to appear
        setListData([...listData, newNodeValue]);
        setNewNodeValue('');
        setIsAdding(false);
        setCurrentIndex(-1);
      };
      addNodeWithAnimation();
    }
  };

  const removeNode = () => {
    const index = parseInt(removeIndex, 10);
    if (!isNaN(index) && index >= 0 && index < listData.length) {
      setIsRemoving(true);
      setCurrentIndex(0);
      setPrevIndex(-1);
      const removeNodeWithAnimation = async () => {
        for (let i = 0; i <= index; i++) {
          if (i > 0) {
            setPrevIndex(i - 1);
          }
          setCurrentIndex(i);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        setNodeToRemove(index);
        await new Promise(resolve => setTimeout(resolve, 500)); // Wait for node to fade out
        const newList = listData.filter((_, i) => i !== index);
        setListData(newList);
        setRemoveIndex('');
        setIsRemoving(false);
        setCurrentIndex(-1);
        setPrevIndex(-1);
        setNodeToRemove(null);
      };
      removeNodeWithAnimation();
    } else {
      alert('Invalid index');
    }
  };

  const getNodeValue = () => {
    const index = parseInt(getIndex, 10);
    if (!isNaN(index) && index >= 0 && index < listData.length) {
      setIsGetting(true);
      setCurrentIndex(-1);
      const getNodeWithAnimation = async () => {
        for (let i = 0; i <= index; i++) {
          setCurrentIndex(i);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        setGetValue(listData[index]);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsGetting(false);
        setCurrentIndex(-1);
      };
      getNodeWithAnimation();
    } else {
      alert('Invalid index');
      setGetValue('');
    }
  };

  const printList = async () => {
    setIsPrinting(true);
    setCurrentIndex(-1);
    setPrintedList([]);
    const printListWithAnimation = async () => {
      for (let i = 0; i < listData.length; i++) {
        setCurrentIndex(i);
        setPrintedList(prev => [...prev, listData[i]]);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      setIsPrinting(false);
      setCurrentIndex(-1);
    };
    printListWithAnimation();
  };

  return (
    <div className="container">
      <div className="header">
        <div className="logo">Bảo Nguyễn</div>
        <h1 className="title">Linked List Visualizer</h1>
      </div>
      <div className="controls">
        <div className="control-group">
          <input
            type="text"
            value={newNodeValue}
            onChange={(e) => setNewNodeValue(e.target.value)}
            placeholder="Enter node value"
            className="input"
          />
          <button onClick={addNode} className="button">Add Node</button>
        </div>
        <div className="control-group">
          <input
            type="number"
            value={removeIndex}
            onChange={(e) => setRemoveIndex(e.target.value)}
            placeholder="Enter index to remove"
            className="input"
          />
          <button onClick={removeNode} className="button">Remove Node</button>
        </div>
        <div className="control-group">
          <input
            type="number"
            value={getIndex}
            onChange={(e) => setGetIndex(e.target.value)}
            placeholder="Enter index to get value"
            className="input"
          />
          <button onClick={getNodeValue} className="button">Get Node Value</button>
        </div>
        <div className="control-group">
          <button onClick={printList} className="button">Print List</button>
        </div>
      </div>
      <div className="linked-list-scroll-container">
        <div className="linked-list-container">
          <LinkedList 
            data={listData} 
            startX={200} 
            startY={100}  // Thay đổi giá trị này từ 300 xuống 200
            nodeDistance={150} 
            isAdding={isAdding}
            isRemoving={isRemoving}
            isGetting={isGetting}
            isPrinting={isPrinting}
            currentIndex={currentIndex}
            prevIndex={prevIndex}
            newNodeValue={newNodeValue}
            nodeToRemove={nodeToRemove}
          />
        </div>
      </div>
      {getValue && <div className="result">Value at index {getIndex}: {getValue}</div>}
      {(isPrinting || printedList.length > 0) && (
        <div className="result">Printed List: {printedList.join(' -> ')}</div>
      )}
    </div>
  );
}