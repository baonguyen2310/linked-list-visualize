using System;

//https://channel9.msdn.com/Forums/TechOff/A-simple-and-pure-C-implementation-of-the-good-old-linked-list
namespace ds_LK_coban
{
    public class List
    {
        public class Node
        {
            public object NodeContent;
            public Node Next;
        }

        private int size;
        private Node head;
        private Node current;

        public int Count
        {
            get
            {
                return size;
            }
        }

        public List()
        {
            size = 0;
            head = null;
        }

        public void Add(object content)
        {
            size++;
            var node = new Node()
            {
                NodeContent = content
            };

            if (head == null)
            {
                head = node;
            }
            else
            {
                current.Next = node;
            }
            current = node;
        }

       ///  Throwing this in to help test the list
        public void ListNodes()
        {
            Node tempNode = head;

            while (tempNode != null)
            {
                Console.WriteLine(tempNode.NodeContent);
                tempNode = tempNode.Next;
            }
        }

        public Node Retrieve(int Position)
        {
            Node tempNode = head;
            Node retNode = null;
            int count = 0;

            while (tempNode != null)
            {
                if (count == Position - 1)
                {
                    retNode = tempNode;
                    break;
                }
                count++;
                tempNode = tempNode.Next;
            }

            return retNode;
        }

        public bool Delete(int Position)
        {
            if (Position == 1)
            {
                head = null;
                current = null;
                return true;
            }

            if (Position > 1 && Position <= size)
            {
                Node tempNode = head;

                Node lastNode = null;
                int count = 0;

                while (tempNode != null)
                {
                    if (count == Position - 1)
                    {
                        lastNode.Next = tempNode.Next;
                        return true;
                    }
                    count++;

                    lastNode = tempNode;
                    tempNode = tempNode.Next;
                }
            }

            return false;
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            List list = new List();

            list.Add("A");
            list.Add("B");
            list.Add("C");
            list.Add("D");
            list.Add("E");
            list.Add("F");
            list.Add("G");
            list.Add("H");

            list.ListNodes();
            Console.WriteLine();

            Console.WriteLine();
            Console.WriteLine("Deleting node 8");
            list.Delete(8);
            list.ListNodes();

            Console.WriteLine();
 Console.WriteLine("Position 5: " + list.Retrieve(5).NodeContent);

            Console.WriteLine();
            Console.WriteLine("Deleting node 5");
            list.Delete(5);

            Console.WriteLine();
 Console.WriteLine("Position 5: " + list.Retrieve(5).NodeContent);

            Console.WriteLine();
            list.ListNodes();

            Console.ReadLine();
        }
    }
}