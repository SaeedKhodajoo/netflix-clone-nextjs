import { CheckIcon } from "@heroicons/react/outline";

interface Props {
  selectedPlan: number;
}

function Table({ selectedPlan }: Props) {
  const firstTableDataClass = `tableDataFeature ${
    selectedPlan === 1 ? "text-[#e50914]" : "text-[gray]"
  }`;
  const secondTableDataClass = `tableDataFeature ${
    selectedPlan === 2 ? "text-[#e50914]" : "text-[gray]"
  }`;
  const thirdTableDataClass = `tableDataFeature ${
    selectedPlan === 3 ? "text-[#e50914]" : "text-[gray]"
  }`;

  return (
    <table>
      <tbody className="divide-y divide-[gray]">
        <tr className="tableRow">
          <td className="tableDataTitle">Monthly price</td>
          <td className={firstTableDataClass}>$9.99</td>
          <td className={secondTableDataClass}>$15.49</td>
          <td className={thirdTableDataClass}>$19.99</td>
        </tr>
        <tr className="tableRow">
          <td className="tableDataTitle">Video quality</td>
          <td className={firstTableDataClass}>Good</td>
          <td className={secondTableDataClass}>Better</td>
          <td className={thirdTableDataClass}>Best</td>
        </tr>
        <tr className="tableRow">
          <td className="tableDataTitle">Resolution</td>
          <td className={firstTableDataClass}>480p</td>
          <td className={secondTableDataClass}>1080p</td>
          <td className={thirdTableDataClass}>4K+HDR</td>
        </tr>
        <tr className="tableRow">
          <td className="tableDataTitle">
            {" "}
            Watch on your TV, computer, mobile phone and tablet
          </td>
          <td className={firstTableDataClass}>
            <CheckIcon className="inline-block h-8 w-8" />
          </td>
          <td className={secondTableDataClass}>
            <CheckIcon className="inline-block h-8 w-8" />
          </td>
          <td className={thirdTableDataClass}>
            <CheckIcon className="inline-block h-8 w-8" />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Table;
