import PostBoard from "@/components/main/PostBoard";

export default function Main() {
  return (
    <div>
        <div>
            <button>정렬</button>
            <ul>
                <li>최신순</li>
                <li>좋아요순</li>
            </ul>
        </div>
      <h2>안녕 메인</h2>
      <PostBoard />
    </div>
  );
}
