import { memo } from 'react'

const Month = (): JSX.Element => {
  return (
    <>
      <tr className="row row-cols-7">
        <td className="col pb-5 text-danger">1</td>
        <td className="col pb-5">2</td>
        <td className="col pb-5">3</td>
        <td className="col pb-5">4</td>
        <td className="col pb-5">5</td>
        <td className="col pb-5">6</td>
        <td className="col pb-5">7</td>
      </tr>
      <tr className="row row-cols-7">
        <td className="col pb-5 text-danger">1</td>
        <td className="col pb-5">2</td>
        <td className="col pb-5">3</td>
        <td className="col pb-5">4</td>
        <td className="col pb-5">5</td>
        <td className="col pb-5">6</td>
        <td className="col pb-5">7</td>
      </tr>
      <tr className="row row-cols-7">
        <td className="col pb-5 text-danger">1</td>
        <td className="col pb-5">2</td>
        <td className="col pb-5">3</td>
        <td className="col pb-5">4</td>
        <td className="col pb-5">5</td>
        <td className="col pb-5">6</td>
        <td className="col pb-5">7</td>
      </tr>
      <tr className="row row-cols-7">
        <td className="col pb-5 text-danger">1</td>
        <td className="col pb-5">2</td>
        <td className="col pb-5">3</td>
        <td className="col pb-5">4</td>
        <td className="col pb-5">5</td>
        <td className="col pb-5">6</td>
        <td className="col pb-5">7</td>
      </tr>
      <tr className="row row-cols-7">
        <td className="col pb-5 text-danger">1</td>
        <td className="col pb-5">2</td>
        <td className="col pb-5">3</td>
        <td className="col pb-5">4</td>
        <td className="col pb-5">5</td>
        <td className="col pb-5">6</td>
        <td className="col pb-5">7</td>
      </tr>
    </>
  )
}

export default memo(Month)
